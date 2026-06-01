mkdir -p /var/www/naema-backend/src/api/admin/products/\[id\]

cat << 'INNER_EOF' > /var/www/naema-backend/src/api/admin/products/\[id\]/route.ts
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { updateProductsWorkflow, deleteProductsWorkflow } from "@medusajs/core-flows"
import { MedusaError, ContainerRegistrationKeys, remoteQueryObjectFromString } from "@medusajs/framework/utils"
import { refetchEntity } from "@medusajs/framework/http"

const CURRENCY_MULTIPLIERS: Record<string, number> = {
  kwd: 1000, bhd: 1000, omr: 1000,
  usd: 100, eur: 100, gbp: 100, aed: 100, sar: 100, inr: 100,
}

function convertToSmallestUnit(amount: number, currencyCode: string): number {
  const multiplier = CURRENCY_MULTIPLIERS[currencyCode.toLowerCase()] || 100
  if (amount < multiplier * 1000) {
    return Math.round(amount * multiplier)
  }
  return amount
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "product",
    variables: { filters: { id: req.params.id } },
    fields: [
      "id", "title", "subtitle", "description", "handle", "status", "thumbnail",
      "is_giftcard", "discountable", "external_id", "metadata",
      "type_id", "collection_id",
      "images.*", "options.*", "options.values.*", "tags.*",
      "variants.*", "variants.options.*",
      "variants.price_set.id", "variants.price_set.prices.*",
      "categories.*", "sales_channels.*",
    ],
  })

  const [product] = await remoteQuery(queryObject)
  if (!product) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Product not found")
  }

  // Remap prices
  if (product?.variants) {
    product.variants = product.variants.map((v: any) => ({
      ...v,
      prices: v.price_set?.prices?.map((price: any) => ({
        id: price.id,
        amount: price.amount,
        currency_code: price.currency_code,
        min_quantity: price.min_quantity,
        max_quantity: price.max_quantity,
        variant_id: v.id,
        created_at: price.created_at,
        updated_at: price.updated_at,
        rules: {},
      })) || [],
    }))
    product.variants.forEach((v: any) => { delete v.price_set })
  }

  res.status(200).json({ product: Array.isArray(product) ? product[0] : product })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const body = req.body as any
  const { additional_data, ...update } = body

  // Fix variant prices on update
  if (update.variants) {
    for (const variant of update.variants) {
      if (variant.prices && Array.isArray(variant.prices)) {
        variant.prices = variant.prices.map((price: any) => {
          if (price && typeof price.amount === "number" && price.currency_code) {
            const converted = convertToSmallestUnit(price.amount, price.currency_code)
            return { ...price, amount: converted }
          }
          return price
        })
      }
    }
  }

  const existingProduct = await refetchEntity("product", req.params.id, req.scope, ["id"])
  if (!existingProduct) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, `Product with id "${req.params.id}" not found`)
  }

  try {
    const { result } = await updateProductsWorkflow(req.scope).run({
      input: {
        selector: { id: req.params.id },
        update,
        additional_data,
      },
    })

    const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
    const queryObject = remoteQueryObjectFromString({
      entryPoint: "product",
      variables: { filters: { id: result[0].id } },
      fields: [
        "id", "title", "subtitle", "description", "handle", "status", "thumbnail",
        "is_giftcard", "discountable", "external_id", "metadata",
        "type_id", "collection_id",
        "images.*", "options.*", "options.values.*", "tags.*",
        "variants.*", "variants.options.*",
        "variants.price_set.id", "variants.price_set.prices.*",
        "categories.*", "sales_channels.*",
      ],
    })

    const [product] = await remoteQuery(queryObject)

    if (product?.variants) {
      product.variants = product.variants.map((v: any) => ({
        ...v,
        prices: v.price_set?.prices?.map((price: any) => ({
          id: price.id,
          amount: price.amount,
          currency_code: price.currency_code,
          min_quantity: price.min_quantity,
          max_quantity: price.max_quantity,
          variant_id: v.id,
          created_at: price.created_at,
          updated_at: price.updated_at,
          rules: {},
        })) || [],
      }))
      product.variants.forEach((v: any) => { delete v.price_set })
    }

    res.status(200).json({ product: Array.isArray(product) ? product[0] : product })
  } catch (e: any) {
    console.error("[PRODUCT-UPDATE-FIX] Error:", e.message)
    res.status(400).json({ message: e.message, type: "invalid_data" })
  }
}

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const id = req.params.id
  await deleteProductsWorkflow(req.scope).run({
    input: { ids: [id] },
  })
  res.status(200).json({ id, object: "product", deleted: true })
}
INNER_EOF

cat << 'INNER_EOF' > /var/www/naema-backend/src/api/admin/products/route.ts
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { createProductsWorkflow } from "@medusajs/core-flows"
import { ContainerRegistrationKeys, remoteQueryObjectFromString } from "@medusajs/framework/utils"

const CURRENCY_MULTIPLIERS: Record<string, number> = {
  kwd: 1000, bhd: 1000, omr: 1000,
  usd: 100, eur: 100, gbp: 100, aed: 100, sar: 100, inr: 100,
}

function convertToSmallestUnit(amount: number, currencyCode: string): number {
  const multiplier = CURRENCY_MULTIPLIERS[currencyCode.toLowerCase()] || 100
  if (amount < multiplier * 1000) {
    return Math.round(amount * multiplier)
  }
  return amount
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const body = req.body as any
  const { additional_data, ...createData } = body

  // Fix variant prices on create
  if (createData.variants) {
    for (const variant of createData.variants) {
      if (variant.prices && Array.isArray(variant.prices)) {
        variant.prices = variant.prices.map((price: any) => {
          if (price && typeof price.amount === "number" && price.currency_code) {
            const converted = convertToSmallestUnit(price.amount, price.currency_code)
            return { ...price, amount: converted }
          }
          return price
        })
      }
    }
  }

  try {
    const { result } = await createProductsWorkflow(req.scope).run({
      input: { products: [createData], additional_data },
    })

    const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
    const queryObject = remoteQueryObjectFromString({
      entryPoint: "product",
      variables: { filters: { id: result[0].id } },
      fields: [
        "id", "title", "subtitle", "description", "handle", "status", "thumbnail",
        "is_giftcard", "discountable", "external_id", "metadata",
        "type_id", "collection_id",
        "images.*", "options.*", "options.values.*", "tags.*",
        "variants.*", "variants.options.*",
        "variants.price_set.id", "variants.price_set.prices.*",
        "categories.*", "sales_channels.*",
      ],
    })

    const [product] = await remoteQuery(queryObject)

    if (product?.variants) {
      product.variants = product.variants.map((v: any) => ({
        ...v,
        prices: v.price_set?.prices?.map((price: any) => ({
          id: price.id,
          amount: price.amount,
          currency_code: price.currency_code,
          min_quantity: price.min_quantity,
          max_quantity: price.max_quantity,
          variant_id: v.id,
          created_at: price.created_at,
          updated_at: price.updated_at,
          rules: {},
        })) || [],
      }))
      product.variants.forEach((v: any) => { delete v.price_set })
    }

    res.status(200).json({ product: Array.isArray(product) ? product[0] : product })
  } catch (e: any) {
    console.error("[PRODUCT-CREATE-FIX] Error:", e.message)
    res.status(400).json({ message: e.message, type: "invalid_data" })
  }
}
INNER_EOF

