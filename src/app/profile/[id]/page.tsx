export default async function UserProfile({params}: any) {
    const { id } = await params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Profile Page</h1>
      <hr />
      <p className="text-4xl text-gray-600">This is the profile page. {id}</p>
    </div>
  );
}