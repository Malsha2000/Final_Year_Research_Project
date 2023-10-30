// Import necessary components from React Navigation
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Import your screens
import QuestionInEnglishPage from "./QuestionInEnglishPage";
import QuizScorePage from "./QuizScorePage";

// Create a stack navigator
const AppNavigator = createStackNavigator(
    {
      QuestionInEnglish: QuestionInEnglishPage,
      QuizScore: QuizScorePage, // Make sure the screen name matches here
    },
    {
      initialRouteName: 'Question In English',
    }
  );

export default createAppContainer(AppNavigator);
