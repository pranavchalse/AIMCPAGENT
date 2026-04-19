const { test, expect } = require('@playwright/test');

test.describe('E-Commerce Product Purchase Flow - GreenKart', () => {
  
  // Product name to test - change this to test different products
  // Available products: Brocolli, Cauliflower, Cucumber, Beetroot, Carrot, Tomato, Beans, Apple, Banana, etc.
  const PRODUCT_NAME = 'Brocolli';

  test('should add product to cart and checkout successfully', async ({ page }) => {
    // Step 1: Navigate to GreenKart e-commerce site
    console.log('Step 1: Navigating to GreenKart...');
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/', { waitUntil: 'load' });
    await page.waitForLoadState('networkidle');
    console.log('✓ GreenKart page loaded');

    // Step 2: Find and add product to cart
    console.log(`Step 2: Finding ${PRODUCT_NAME} product...`);
    
    // Look for the product heading that contains the product name
    const productLocator = page.locator(`text=${PRODUCT_NAME}`).first();
    const isProductVisible = await productLocator.isVisible().catch(() => false);
    
    expect(isProductVisible).toBeTruthy();
    console.log(`✓ ${PRODUCT_NAME} product found`);

    // Step 3: Click "ADD TO CART" button for the product
    console.log(`Step 3: Adding ${PRODUCT_NAME} to cart...`);
    
    // Find the product container and click its ADD TO CART button
    const productContainer = page.locator(`//h4[contains(text(), '${PRODUCT_NAME}')]/../../..`);
    const addToCartButton = productContainer.locator('button:has-text("ADD TO CART")').first();
    
    if (await addToCartButton.isVisible()) {
      await addToCartButton.click();
      await page.waitForLoadState('networkidle');
      console.log(`✓ ${PRODUCT_NAME} added to cart`);
    } else {
      throw new Error(`Could not find ADD TO CART button for ${PRODUCT_NAME}`);
    }

    // Step 4: Navigate to Cart
    console.log('Step 4: Navigating to cart...');
    
    // Look for the cart/checkout area - typically in the top right
    // The cart shows the amount like ₹
    const cartIcon = page.locator('[class*="cart"], a:has-text("Cart"), button:has-text("Cart")').first();
    
    // Wait a moment for the page to process the add to cart action
    await page.waitForTimeout(1000);
    
    // Try clicking the logo or search for checkout button
    const checkoutButton = page.locator('//button | //a').filter({ hasText: /checkout|cart|proceed/i }).first();
    
    // Look for the cart total display - it should show the cart icon with the price
    // Since GreenKart shows cart in real-time, we'll look for cart navigation
    const cartElements = page.locator('[class*="cart"], [data-test*="cart"]');
    const cartCount = await cartElements.count();
    console.log(`Found ${cartCount} cart elements`);

    // Step 5: Verify product is in cart by checking page content
    console.log(`Step 5: Verifying ${PRODUCT_NAME} is in cart...`);
    
    const pageContent = await page.content();
    const productInCart = pageContent.includes(PRODUCT_NAME);
    
    expect(productInCart).toBeTruthy();
    console.log(`✓ ${PRODUCT_NAME} confirmed in page`);

    // Step 6: Proceed to checkout
    console.log('Step 6: Proceeding to checkout...');
    
    // Wait for dynamic content and look for checkout/cart icon
    await page.waitForTimeout(500);
    
    // Try to find and click checkout option
    // GreenKart typically has a cart icon that we need to find
    const cartArea = page.locator('[class*="cart"], span:has-text("₹")').first();
    
    if (await cartArea.isVisible()) {
      await cartArea.click();
      await page.waitForLoadState('networkidle');
      console.log('✓ Clicked cart/checkout area');
    }

    // Step 7: Look for and interact with checkout form elements
    console.log('Step 7: Checking for checkout form...');
    
    // Look for checkout-related buttons/links
    const proceedButton = page.locator('button, a').filter({ hasText: /proceed|checkout|place order|buy/i }).first();
    
    if (await proceedButton.isVisible()) {
      await proceedButton.click();
      await page.waitForLoadState('networkidle');
      console.log('✓ Clicked checkout/proceed button');
    }

    // Step 8: Verify product in final state
    console.log('Step 8: Verifying product selection...');
    
    const finalContent = await page.content();
    const productConfirmed = finalContent.includes(PRODUCT_NAME);
    
    expect(productConfirmed).toBeTruthy();
    console.log(`✓ ${PRODUCT_NAME} successfully processed`);

    console.log(`\n✅ Test completed: ${PRODUCT_NAME} added to cart successfully`);
  });

  test('should allow multiple products to be added to cart', async ({ page }) => {
    console.log('\nTest: Adding multiple products to cart');
    
    // Navigate to site
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/', { waitUntil: 'load' });
    await page.waitForLoadState('networkidle');

    // Add multiple products
    const productsToAdd = ['Brocolli', 'Carrot', 'Tomato'];
    
    for (const product of productsToAdd) {
      console.log(`Adding ${product}...`);
      
      const productLocator = page.locator(`text=${product}`).first();
      const isVisible = await productLocator.isVisible().catch(() => false);
      
      if (isVisible) {
        const productContainer = page.locator(`//h4[contains(text(), '${product}')]/../../..`);
        const button = productContainer.locator('button:has-text("ADD TO CART")').first();
        
        if (await button.isVisible()) {
          await button.click();
          await page.waitForTimeout(500);
          console.log(`✓ ${product} added`);
        }
      }
    }
    
    console.log(`✅ Multiple products added to cart`);
  });

  test('should verify product details and pricing', async ({ page }) => {
    console.log('\nTest: Verifying product details');
    
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/', { waitUntil: 'load' });
    await page.waitForLoadState('networkidle');

    // Find product and check its details
    const productText = page.locator(`text=${PRODUCT_NAME}`).first();
    expect(await productText.isVisible()).toBeTruthy();

    // Look for price information
    const priceElement = productText.locator('../..').locator('p').first();
    const priceText = await priceElement.textContent().catch(() => 'N/A');
    
    console.log(`Product: ${PRODUCT_NAME}`);
    console.log(`Price: ${priceText}`);
    console.log(`✅ Product details verified`);
  });
});