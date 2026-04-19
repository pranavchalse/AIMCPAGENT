# AI MCP Agent - Playwright E-Commerce Testing

This repository contains automated end-to-end tests for e-commerce functionality using Playwright.

## 🚀 Features

- **E-Commerce Testing**: Comprehensive test suite for product selection, cart management, and checkout processes
- **GreenKart Integration**: Tests the Rahul Shetty Academy's GreenKart e-commerce platform
- **Multi-Browser Support**: Tests run on Chromium, Firefox, and WebKit browsers
- **CI/CD Integration**: GitHub Actions workflow for automated testing on every push and pull request

## 📋 Test Scenarios

### E-Commerce Product Purchase Flow
1. **Product Selection**: Navigate to GreenKart and locate products
2. **Add to Cart**: Add products to shopping cart
3. **Cart Verification**: Verify products are correctly added to cart
4. **Checkout Process**: Navigate through checkout flow
5. **Order Confirmation**: Verify successful order placement

### Additional Tests
- **Multiple Products**: Test adding multiple items to cart simultaneously
- **Product Details**: Verify product information and pricing display
- **Cart Management**: Test cart functionality and totals

## 🛠️ Setup

### Prerequisites
- Node.js (LTS version recommended)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/pranavchalse/AIMCPAGENT.git
cd AIMCPAGENT

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests
```bash
# Run all tests
npx playwright test

# Run tests in headed mode (with browser UI)
npx playwright test --headed

# Run specific test file
npx playwright test tests/ecommerce-iphone-checkout.spec.js

# Run tests in a specific browser
npx playwright test --project=chromium

# Generate test report
npx playwright show-report
```

## 📁 Project Structure

```
AIMCPAGENT/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI/CD pipeline
├── tests/
│   ├── example.spec.js             # Basic Playwright examples
│   └── ecommerce-iphone-checkout.spec.js  # E-commerce test suite
├── playwright.config.js            # Playwright configuration
├── package.json                    # Project dependencies
└── README.md                       # This file
```

## 🔧 Configuration

### Playwright Config (`playwright.config.js`)
- **Test Directory**: `./tests`
- **Browsers**: Chromium (primary), Firefox, WebKit
- **Parallel Execution**: Enabled for faster test runs
- **Retries**: 2 retries on CI failures
- **Reporting**: HTML reports with trace collection

### Test Configuration
- **Base URL**: GreenKart e-commerce site
- **Product**: Configurable product selection (default: Brocolli)
- **Timeouts**: Appropriate timeouts for e-commerce interactions

## 🌐 Test Environment

- **Test Site**: https://rahulshettyacademy.com/seleniumPractise/
- **Products Available**: Vegetables and fruits (Brocolli, Carrot, Tomato, Apple, etc.)
- **Currency**: Indian Rupees (₹)

## 📊 CI/CD Pipeline

The GitHub Actions workflow automatically:
- Runs on every push and pull request
- Installs Node.js and dependencies
- Installs Playwright browsers
- Executes all tests
- Generates and uploads test reports
- Times out after 60 minutes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your tests or improvements
4. Run tests locally
5. Commit and push changes
6. Create a pull request

## 📝 Test Customization

To test different products, modify the `PRODUCT_NAME` constant in `tests/ecommerce-iphone-checkout.spec.js`:

```javascript
const PRODUCT_NAME = 'Apple';  // Change to any available product
```

Available products include:
- Brocolli, Cauliflower, Cucumber
- Beetroot, Carrot, Tomato
- Beans, Brinjal, Capsicum
- Apple, Banana, Grapes, Mango
- And many more...

## 📈 Test Results

All tests are designed to:
- ✅ Pass successfully on the GreenKart platform
- ✅ Handle dynamic content and loading states
- ✅ Provide detailed console logging
- ✅ Generate comprehensive HTML reports

## 🐛 Troubleshooting

### Common Issues
- **Browser Installation**: Run `npx playwright install` if browsers are missing
- **Network Issues**: Tests may fail due to network connectivity
- **Site Changes**: GreenKart site updates may require test adjustments

### Debug Mode
```bash
# Run tests in debug mode
npx playwright test --debug

# Run with browser UI
npx playwright test --headed
```

## 📞 Support

For issues or questions:
- Check the [Playwright documentation](https://playwright.dev/docs/intro)
- Review test execution logs
- Examine HTML reports in `playwright-report/`

---

**Happy Testing! 🎭**