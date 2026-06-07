import { prisma } from "@/lib/prisma";
import { deleteMessage } from "./actions";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Messages</h1>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="rounded-lg border p-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold">{message.name}</h2>

                  <p className="text-sm text-gray-500">{message.email}</p>

                  {message.phone && (
                    <p className="text-sm text-gray-500">{message.phone}</p>
                  )}

                  {message.subject && (
                    <p className="mt-2 font-medium">
                      Subject: {message.subject}
                    </p>
                  )}

                  <p className="mt-3 whitespace-pre-wrap">{message.message}</p>

                  <p className="mt-3 text-xs text-gray-400">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>

                <form
                  action={async () => {
                    "use server";
                    await deleteMessage(message.id);
                  }}
                >
                  <button
                    type="submit"
                    className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
