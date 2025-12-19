import React from "react"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationControl({
    currentPage,
    totalPages,
    onPageChange,
    createPageUrl,
}) {
    // Helper to handle click or link generation
    const getPageProps = (page) => {
        if (createPageUrl) {
            return { href: createPageUrl(page) }
        }
        return {
            href: "#",
            onClick: (e) => {
                e.preventDefault()
                onPageChange?.(page)
            },
        }
    }

    // Logic to determine which page numbers to show
    const getPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 5 // Adjust as needed

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first, last, and pages around current
            if (currentPage <= 3) {
                for (let i = 1; i <= 3; i++) pages.push(i)
                pages.push("ellipsis")
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push("ellipsis")
                for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i)
            } else {
                pages.push(1)
                pages.push("ellipsis")
                pages.push(currentPage - 1)
                pages.push(currentPage)
                pages.push(currentPage + 1)
                pages.push("ellipsis")
                pages.push(totalPages)
            }
        }
        return pages
    }

    if (totalPages <= 1) return null

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        {...getPageProps(Math.max(1, currentPage - 1))}
                        aria-disabled={currentPage === 1}
                        className={currentPage === 1 ? "pointer-events-none opacity-50 hover:text-blue-500" : ""}
                    />
                </PaginationItem>

                {getPageNumbers().map((page, index) => (
                    <PaginationItem key={index}>
                        {page === "ellipsis" ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                className="hover:text-blue-500"
                                {...getPageProps(page)}
                                isActive={currentPage === page}
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        {...getPageProps(Math.min(totalPages, currentPage + 1))}
                        aria-disabled={currentPage === totalPages}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
