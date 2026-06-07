import { clerkClient } from "@clerk/nextjs/server";
import { deleteUserAction, banUserAction, unbanUserAction } from "./actions";

export default async function UsersPage() {
  const client = await clerkClient();
  const users = await client.users.getUserList();

  return (
    <div className="mb-[3%] grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {users.data.map((user) => (
        <div
          key={user.id}
          className="rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="mb-4 flex items-center gap-4">
            <img
              src={user.imageUrl}
              alt={user.fullName || "User"}
              className="h-16 w-16 rounded-full object-cover"
            />

            <div>
              <h2 className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </h2>

              <p className="text-sm text-gray-500">
                @{user.username || "No Username"}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {user.emailAddresses
                .map((email) => email.emailAddress)
                .join(", ")}
            </p>

            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {user.phoneNumbers.length
                ? user.phoneNumbers.map((phone) => phone.phoneNumber).join(", ")
                : "Not provided"}
            </p>

            <p>
              <span className="font-semibold">Created:</span>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>

            <p>
              <span className="font-semibold">Last Login:</span>{" "}
              {user.lastSignInAt
                ? new Date(user.lastSignInAt).toLocaleDateString()
                : "Never"}
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                user.banned
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {user.banned ? "Banned" : "Active"}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                user.locked
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {user.locked ? "Locked" : "Unlocked"}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {user.banned ? (
              <form action={unbanUserAction.bind(null, user.id)}>
                <button
                  type="submit"
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  Unban
                </button>
              </form>
            ) : (
              <form action={banUserAction.bind(null, user.id)}>
                <button
                  type="submit"
                  className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600"
                >
                  Ban
                </button>
              </form>
            )}

            <form action={deleteUserAction.bind(null, user.id)}>
              <button
                type="submit"
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
