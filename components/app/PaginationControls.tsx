import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
    pages: (string | number)[];
    currentPage: number;
    goTo: (page: number | string) => void;
}

export const PaginationControls = (
    { pages, currentPage, goTo }: PaginationControlsProps) => (
    <Pagination className="mt-2 md:mt-0" data-testid="pagination">
        <PaginationContent>
            <PaginationPrevious
                data-testid="pagination-prev"
                onClick={() => goTo(currentPage - 1)}
            />
            {pages.map((itm, idx) => (
                <PaginationItem key={`${itm}-${idx}`}>
                    {itm === 'ellipsis' ? (
                        <PaginationEllipsis />
                    ) : (
                        <PaginationLink
                            onClick={() => goTo(itm)}
                            isActive={itm === currentPage}
                        >
                            {itm}
                        </PaginationLink>
                    )}
                </PaginationItem>
            ))}
            <PaginationNext
                onClick={() => goTo(currentPage + 1)} data-testid="pagination-next"
            />
        </PaginationContent>
    </Pagination>
);