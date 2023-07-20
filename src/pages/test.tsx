import Editor from "@/ui/editor";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-white flex-col items-center sm:px-5 sm:pt-[calc(20vh)]">
        <h1 className="text-xl font-regular">
            test
        </h1>
      <Editor />
    </div>
  );
}
