import Medusa from "@medusajs/js-sdk";

const medusa = new Medusa({
  baseUrl: "http://187.127.166.159/api",
  publishableKey: "pk_ed2e2b7b35796dd735f8ca890ae87375a50d3e5ac2076922d317b3a52cb76042",
});

async function run() {
  try {
    // 1. Create cart
    const cartRes = await medusa.store.cart.create({ region_id: "reg_01KRK1KY4AJAE7SECNRDMJN2S2" });
    const cartId = cartRes.cart.id;
    console.log("Created cart ID:", cartId);
    
    // Get a product variant
    const productsRes = await medusa.store.product.list({ limit: 1 });
    const variantId = productsRes.products[0].variants[0].id;
    console.log("Using variant ID:", variantId);

    // 2. Add line item
    const addRes = await medusa.store.cart.createLineItem(cartId, {
      variant_id: variantId,
      quantity: 1,
    });
    console.log("createLineItem response keys:", Object.keys(addRes));
    const lineItemId = addRes.cart.items[0].id;
    console.log("Line item ID:", lineItemId);

    // 3. Update line item
    const updateRes = await medusa.store.cart.updateLineItem(cartId, lineItemId, {
      quantity: 2,
    });
    console.log("updateLineItem response keys:", Object.keys(updateRes));

    // 4. Delete line item
    const deleteRes = await medusa.store.cart.deleteLineItem(cartId, lineItemId);
    console.log("deleteLineItem response keys:", Object.keys(deleteRes));
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
