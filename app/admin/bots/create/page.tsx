
import CreateBotForm from '@/components/admin/CreateBotForm';

export default function CreateBotPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-bold tracking-tight">Create New Bot</h2>
      </div>
      <CreateBotForm />
    </div>
  );
}
