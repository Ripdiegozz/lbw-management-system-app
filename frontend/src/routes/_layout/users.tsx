import { Button } from '@/components/ui/button';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/users')({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Books</h1>
        <Link href="/books/add">
          <Button>Add New Book</Button>
        </Link>
      </div>
      {/* <BookList /> */}
    </div>
  );
}
