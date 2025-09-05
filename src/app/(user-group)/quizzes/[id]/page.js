import { notFound } from "next/navigation";
import Button from "./button";

async function fetchQuizData(id) {
    try {
        // Use absolute URL for fetch inside a server component
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quizzes/get/${id}`, {
            cache: "no-store" // Ensures fresh data every time
        });

        if (!response.ok) {
            console.log(`Quiz not found: ${id}`);
            return null;
        }

        const data = await response.json();
        return data.data; // Assuming the response structure has `{ quiz: {...} }`
    } catch (error) {
        console.error("Error fetching quiz:", error);
        return null;
    }
}

const QuizzPage = async ({ params }) => {

    const quizz = await fetchQuizData(params.id);

    if (!quizz) {
        return notFound(); // Fix: Ensure `notFound()` is returned immediately
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden py-12">
            {/* Animated Background Elements */}
            <div className="fixed top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <section className="relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-3xl">
                            <div className="h-20 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 flex items-center px-8">
                                <span className="text-4xl mr-6 opacity-90">{quizz.icon}</span>
                                <h1 className="text-3xl font-bold text-white">{quizz.title}</h1>
                            </div>

                            <div className="p-8">
                                <div className="mb-8">
                                    <p className="text-gray-700 text-xl mb-6 leading-relaxed">{quizz.description}</p>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm text-blue-700 rounded-full text-sm font-medium border border-blue-500/30">
                                            {quizz.category}
                                        </span>
                                        <span className="px-4 py-2 bg-emerald-500/20 backdrop-blur-sm text-emerald-700 rounded-full text-sm font-medium border border-emerald-500/30">
                                            {quizz.difficulty}
                                        </span>
                                        <span className="px-4 py-2 bg-purple-500/20 backdrop-blur-sm text-purple-700 rounded-full text-sm font-medium border border-purple-500/30">
                                            ${quizz.price}
                                        </span>
                                    </div>
                                </div>

                                <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl p-6 shadow-lg space-y-4 mb-8">
                                    <div className="flex justify-between items-center py-3 border-b border-white/20 last:border-b-0">
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span className="font-medium">Time Limit</span>
                                        </div>
                                        <span className="text-gray-900 font-bold text-lg">{quizz.timeLimit || "30"} Minutes</span>
                                    </div>

                                    <div className="flex justify-between items-center py-3 border-b border-white/20 last:border-b-0">
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span className="font-medium">Number of Questions</span>
                                        </div>
                                        <span className="text-gray-900 font-bold text-lg">{quizz.questions.length || "N/A"}</span>
                                    </div>

                                    <div className="flex justify-between items-center py-3">
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                            </svg>
                                            <span className="font-medium">Instructor</span>
                                        </div>
                                        <span className="text-gray-900 font-bold text-lg">{quizz.instructor}</span>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <Button quiz={quizz} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default QuizzPage;
