'use client';
import MagnifyingGlassIcon from '@heroicons/react/20/solid/MagnifyingGlassIcon';
import { useSearchParams } from 'next/navigation';

const SearchBox: React.FC = () => {
  const searchParams = useSearchParams();

  const handleSearch = (e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined }) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    if (search) {
      window.location.href = `/search?q=${search}`;
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
      <div className="w-full max-w-lg lg:max-w-xs">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <form onSubmit={handleSearch}>
            <input
              id="search"
              name="search"
              className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search"
              type="search"
              defaultValue={searchParams !== null ? searchParams.get('q') ?? '' : ''}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
