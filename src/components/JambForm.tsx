import { useAuthContext } from "@/hooks/authContext";
import { db } from "@/utils/config";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LoaderIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function SetupForm() {
  const [subjects, setSubjects] = useState<string[]>(["english"]);
  // const navigate = useNavigate()

  const { user, trialsDb, setTrialsDb } = useAuthContext();
  const { email } = user;
  const {
    //  databaseID,
    trials,
  } = trialsDb;

  // Zod schema for the jamb question fetcching
  const CbtSchema = z.object({
    examType: z.string(),
    subjects: z.array(z.string()).nonempty(),
  });
  type CbtShemaType = z.infer<typeof CbtSchema>;

  // adjust the selected subjects
  const adjustSubject = (subject: string) => {
    setSubjects((sub) => {
      if (sub && sub.includes(subject)) {
        return sub.filter((other) => other !== subject);
      } else {
        return sub ? [...sub, subject] : [subject];
      }
    });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<CbtShemaType>({
    resolver: zodResolver(CbtSchema),
    defaultValues: {
      examType: "utme",
      subjects: [
        "english",
        "physics",
        "chemistry",
        "biology",
        "literature",
        "crs",
        "accounting",
        "mathematics",
        "economics",
      ],
    },
  });
  const selectedSubjects = watch("subjects");

  // @ts-expect-error "data has any type"
  const fetchExamQuestions = async (data) => {
    const submitData = { examType: data.examType, subjects };
    console.log(submitData);
    // try {
    //   const url = `http://localhost:3000/api/exam`;
    //   const response = await fetch(url, {
    //     method: "POST",
    //     body: JSON.stringify(submitData),
    //     headers: {
    //       Accept: "application/json",
    //       "Content-type": "application/json",
    //     },
    //   });
    //   const data = await response.json();
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //   const EXAM_TIME: { duration: number; isExamStarted: boolean } = {
    //     duration: 7200,
    //     isExamStarted: true,
    //   };
    //   localStorage.setItem("examTime", JSON.stringify(EXAM_TIME));
    //   localStorage.setItem("allQuestions", JSON.stringify(data));
    //   const submittedDetails = { isSubmitted: false, selectedOptions: "" };
    //   localStorage.setItem("examSubmitted", JSON.stringify(submittedDetails));
    //   dispatch(fetchQuestions(data));
    //   dispatch(setTimerTime(EXAM_TIME.duration));
    //   router.replace("/cbt/exam");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const getTrials = async () => {
    const usersDb = collection(db, "users");
    // @ts-expect-error "all"
    const allUsersEmail = [];
    const snapshot = await getDocs(usersDb);
    snapshot.forEach((doc) =>
      allUsersEmail.push({ id: doc.id, data: doc.data() }),
    );
    // @ts-expect-error "all"
    const userId = allUsersEmail.filter(
      (dbUser) => dbUser.data.userEmail === email,
    )[0];
    const currentUserRef = doc(db, "users", userId.id);
    const currentUserDoc1 = await getDoc(currentUserRef);
    const newDoc = currentUserDoc1.data();
    // @ts-expect-error "all"
    const newTrials = newDoc.trials;
    await updateDoc(currentUserRef, { trials: newTrials - 1 });
    setTrialsDb((prev) => ({ ...prev, trials: newTrials - 1 }));
  };

  const startExam: SubmitHandler<CbtShemaType> = async (data) => {
    try {
      if (trials > 0) {
        await fetchExamQuestions(data);
        await getTrials();
        console.log(trials);
      } else {
        alert("You have exhausted all your trials");
      }
    } catch (error) {
      console.error("The error from fetching is ", error);
    }
  };

  return (
    <article className="relative flex  items-center justify-center overflow-hidden py-10 ">
      <div className="flex max-h-[30rem] w-fit overflow-hidden rounded-3xl bg-background shadow-2xl ">
        <img
          src="assets/closeup.png"
          alt="form banner"
          className="hidden min-h-[10rem] min-w-80 object-cover object-right md:inline"
        />

        <form
          onSubmit={handleSubmit(startExam)}
          className="flex w-[90vw] max-w-sm flex-col gap-4 p-6 md:px-10 md:py-4 "
        >
          <div>
            <img
              src="assets/jamblogo.png"
              alt="jamb logo"
              className="mx-auto w-32"
            />
          </div>
          <h4 className="text-center"> JAMB CBT</h4>
          <div className="mt-2 flex flex-col gap-2 ">
            <label className="font-semibold">Subjects</label>
            <ul>
              {subjects.map((subject, index) => (
                <li key={index}>
                  <button
                    className="px-2 py-1 capitalize hover:shadow-none "
                    type="button"
                    disabled={subject === "english"}
                    onClick={() =>
                      setSubjects((sub) =>
                        sub.filter((other) => other !== subject),
                      )
                    }
                  >
                    ✅{subject === "english" && " Use of"} {subject}
                  </button>
                </li>
              ))}
            </ul>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select Subjects</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="h-80 w-[80vw] max-w-80 overflow-y-scroll  ">
                <DropdownMenuSeparator />
                {selectedSubjects.map((subject, index) => (
                  <div key={index}>
                    <DropdownMenuCheckboxItem
                      key={index}
                      className="capitalize"
                      checked={subjects.includes(subject)}
                      onCheckedChange={() => adjustSubject(subject)}
                      {...register("subjects")}
                      disabled={
                        subject === "english" ||
                        (!subjects.includes(subject) && subjects.length > 3)
                      }
                    >
                      {subject}
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator key={`separator${index}`} />
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            className="bg-green-600 hover:bg-green-500"
            type="submit"
            disabled={subjects.length !== 4}
          >
            {isSubmitting ? (
              <LoaderIcon className="mx-auto animate-spin " />
            ) : (
              "Start"
            )}
          </Button>
        </form>
      </div>
    </article>
  );
}
