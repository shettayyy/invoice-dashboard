# Invoice Dashboard

Invoicing application for the accounting department of any firm.

## Brief

Using TypeScript and React, an invoicing system has been created which matches the design files provided in the `/designs` folder. The functionality is outlined under **Features**.

All the required assets for this project are in the `/assets` folder. The assets are already exported for the correct screen size and optimized. Some images are reusable at multiple screen sizes.

The design system file will give you more information about the various colors, fonts, and styles used in this project.

Data is being provided via a local `data.json` file. You can replace it with your own data.

### Features

- Creating an invoice
  - When creating a new invoice, an ID is generated. The format of the ID is 2 random uppercased letters followed by 4 random numbers.
  - Invoices can be created either as drafts or as pending. Clicking "Save as Draft" allows the user to leave any form field blank but creates an ID if one doesn't exist and set the status to "draft". Clicking "Save & Send" requires all forms fields to be filled in, and should set the status to "pending".
  - Changing the Payment Terms field sets the `paymentDue` property based on the `createdAt` date plus the numbers of days set for the payment terms.
  - The `total` is the sum of all items on the invoice.
- Editing an invoice
  - When saving changes to an invoice, all fields are required when the "Save Changes" button is clicked. If the user clicks "Cancel", any unsaved changes resets.
  - If the invoice being edited is a "draft", the status updates to "pending" when the "Save Changes" button is clicked. All fields are required at this stage.
- Users can mark invoices as paid by clicking the "Mark as Paid" button. This should change the invoice's status to "paid".
- Users receive a confirmation modal when trying to delete invoices.

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
