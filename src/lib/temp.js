// const getQuiz = async (
//   amount: string | number,
//   category: string,
//   difficulty: string,
//   type: string,
// ) => {
//   try {
//     setFormState({ error: "", loading: true });
//     const quizData = { amount, category, difficulty, type };
//     const response = await fetch(import.meta.env.VITE_USER_GETQUIZ, {
//       method: "POST",
//       body: JSON.stringify(quizData),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${user.token}`,
//       },
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       if (data.error.includes("getaddrinfo ENOTFOUND ac-am0iexc")) {
//         setFormState((prev) => ({
//           ...prev,
//           error: "Please check your connection",
//         }));
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       setFormState((prev) => ({ ...prev, error: data.error }));
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     setQuiz(data.results);
//     if (data.results.length === 0) {
//       setFormState((prev) => ({
//         ...prev,
//         error: "No Questions Available, try again",
//       }));
//       return;
//     }
//     const initialQuizResult: Result = {
//       ...result,
//       isubmitted: false,
//       isQuizStarted: true,
//       answers: [],
//       correctAnswer: [],
//       questionsAnswered: data.results,
//     };
//     setResult(initialQuizResult);
//     localStorage.setItem("quizResults", JSON.stringify(initialQuizResult));
//     localStorage.setItem("quizerQuiz", JSON.stringify(data.results));
//   } catch (error) {
//     console.error(error);
//   } finally {
//     setFormState((prev) => ({ ...prev, loading: false }));
//   }
// };

// const postResult = async () => {
//   try {
//     const quizResult: QuizResultTypes = {
//       username: user.name,
//       category: result.questionsAnswered[0].category,
//       score: result.score,
//       totalQuestions: result.questionsAnswered.length,
//       questions: result.questionsAnswered,
//     };
//     const response = await fetch(import.meta.env.VITE_USER_SUBMITRESULTS, {
//       method: "POST",
//       body: JSON.stringify(quizResult),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${user.token}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

//  const getAllQuestions = async () => {
//    try {
//      setIsFetchingDbQuiz(true);
//      const username = { username: user.name };
//      const response = await fetch(import.meta.env.VITE_USER_GETALLQUIZ, {
//        method: "POST",
//        body: JSON.stringify(username),
//        headers: {
//          "Content-Type": "application/json",
//          Authorization: `Bearer ${user.token}`,
//        },
//      });
//      const data = await response.json();
//      if (!response.ok) {
//        setDatabaseQuiz([]);
//        throw new Error(`HTTP error! Status: ${response.status}`);
//      }
//      setDatabaseQuiz(data);
//    } catch (error) {
//      console.error(error);
//    } finally {
//      setIsFetchingDbQuiz(false);
//    }
//  };
