import JambNavbar from "@/components/JambNavbar";
import { useAuthContext } from "@/hooks/authContext";
import { useJambContext } from "@/hooks/jambContext";
import { db } from "@/utils/config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function JambDashboard() {
  const [databaseResults, setDatabaseResults] = useState([]);
  const { user, trialsDb } = useAuthContext();
  const { questionStates } = useJambContext();

  const { email } = user;
  const { trials } = trialsDb;
  const { isSubmitted } = questionStates;

  useEffect(() => {
    const suscribe = async () => {
      try {
        const userScore = collection(db, "userScore");
        // eslint-disable-next-line
        const allUsersScores: any = [];
        const snapshot = await getDocs(userScore);
        snapshot.forEach((doc) => allUsersScores.push({ data: doc.data() }));
        const databaseScore = allUsersScores.filter(
          // eslint-disable-next-line
          (dbUser: any) => dbUser.data.userEmail === email,
        );
        setDatabaseResults(databaseScore);
      } catch (error) {
        console.log(error);
      }
    };
    suscribe();
    // eslint-disable-next-line
  }, [email, isSubmitted]);

  return (
    <div className="h-screen bg-green-100 ">
      <JambNavbar />
      <section className="grid pt-32 md:grid-cols-12">
        <div className="col-span-6  ">
          <h2 className="mb-6 text-4xl text-green-950">
            Welcome to Your Dashboard
          </h2>
          <p className="my-4 flex justify-between rounded-sm bg-red-500 px-4 py-2 text-2xl capitalize text-white ">
            <span>Numbers of Trials Left </span> <span>{trials} </span>
          </p>
          <div>
            {databaseResults.length === 0 ? (
              <div>
                <p>
                  You have no previous performance, click below to take a test
                </p>
                <div className="mt-10">
                  <Link
                    to="/cbt/examform"
                    className="rounded-md bg-red-500 px-4 py-2 text-white hover:opacity-80"
                  >
                    Take exam
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <h5>Your Previous Performance</h5>

                {/* eslint-disable-next-line */}
                {databaseResults.map((result: any, index: number) => (
                  <div key={index}>
                    <p className="my-4 flex justify-between rounded-sm bg-green-500 px-4 py-2 text-2xl capitalize text-white ">
                      <span>Exam {index + 1} </span>
                      <span>{result.data.score}/400</span>
                    </p>
                  </div>
                ))}
                <div className="mt-10">
                  <Link
                    to="/jambform"
                    className="rounded-md bg-red-500 px-4 py-2 text-white hover:opacity-80"
                  >
                    Take another exam
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-6">
          <img src="/assets/homeIcon.png" alt="secondary image" />
        </div>
      </section>
    </div>
  );
}
