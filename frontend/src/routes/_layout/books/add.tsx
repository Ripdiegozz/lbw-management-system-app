import { AddBookForm } from '@/components/books/add-book-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/books/add')({
  component: AddBookComponent
});

function AddBookComponent() {
  return (
    <div className="container mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6">Agregar un libro</h1>
      <AddBookForm />
    </div>
  );
}
