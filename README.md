
# FoodieFinds

FoodieFinds is a React Native application designed to help users explore restaurants, events, and more. It includes authentication, search functionality, detailed restaurant/event views, favorites management, and a user profile.

## Features

- **Authentication:**
  - Supports email/password authentication using Firebase.
  - Google authentication for web version; currently not supported in native apps.

- **Home Page:**
  - Search functionality for food, events, or specific restaurants by name and city.
  - Displays a list of restaurants/events based on search queries.
  - View Details button navigates to Restaurant Details page

- **Restaurant Details:**
  - Detailed view for each item showing images and additional information.
  - External link to Yelp for detailed restaurant information when clicked on restaurant name.
  - Detailed view includes horizontally scrollable images.
  - Navigation to Ratings and Reviews page when clicked on ratings

- **Ratings and Reviews:**
  - Detailed view includes ratings information.
  - Users can view reviews and submit reviews (requires authentication).

- **Favorites:**
  - Dedicated page for displaying user favorites.

- **Profile:**
  - Displays user details.
  - Allows users to log out.

## Setup

1. **Firebase Configuration:**
   - Configure Firebase for authentication. (Provide instructions or links to guides for setting up Firebase authentication.)

2. **Environment Variables:**
   - Create an `env.js` file and add Firebase configuration details.

```javascript
// Example env.js file
export const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  // Add other Firebase config details
};
```

3. **Installation:**
   - Clone the repository.
   - Run `npm install` to install dependencies.

4. **Running the App:**
   - Use `npx expo start` to run the app.
   - Use Expo go build.


## Future Improvements

- Enable Google authentication in native apps.
- Enhance user experience with smoother transitions and animations.
- Expand search functionality to include more categories.
- Implement more social features, such as sharing and commenting.

## Contributing

Contributions are welcome! If you have suggestions, improvements, or bug fixes, please feel free to open an issue or submit a pull request.
