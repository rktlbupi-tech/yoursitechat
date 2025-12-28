
import InstantBotBuilder from '@/components/InstantBotBuilder';

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
         {/* Navigation/Back Button could go here */}
         <InstantBotBuilder />
      </div>
    </div>
  );
}
