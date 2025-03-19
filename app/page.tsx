import Editor from "@/components/Editor/Editor";

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Text Editor Using Next
      </h1>
      <div className="max-w-5xl mx-auto shadow-lg rounded-lg overflow-hidden">
        <Editor />
      </div>
    </main>
  );
}
