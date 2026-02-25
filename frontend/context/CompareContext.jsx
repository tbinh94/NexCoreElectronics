'use client';
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const CompareContext = createContext(null);

export const CompareProvider = ({ children }) => {
    const [compareList, setCompareList] = useState([]);

    useEffect(() => {
        const storedList = localStorage.getItem("compareList");
        if (storedList) {
            try {
                setCompareList(JSON.parse(storedList));
            } catch (e) {
                console.error("Failed to parse compare list", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("compareList", JSON.stringify(compareList));
    }, [compareList]);

    const addToCompare = (product) => {
        if (compareList.find(item => item._id === product._id)) {
            toast.info("Sản phẩm đã có trong danh sách so sánh");
            return;
        }

        if (compareList.length >= 2) {
            // If already 2 products, replace the last one or show warning?
            // User said "go to another product to click compare", implying 2 products.
            toast.warning("Chỉ có thể so sánh tối đa 2 sản phẩm. Vui lòng xóa bớt.");
            return;
        }

        setCompareList(prev => [...prev, product]);
        toast.success(`Đã thêm ${product.name} vào danh sách so sánh`);
    };

    const removeFromCompare = (productId) => {
        setCompareList(prev => prev.filter(item => item._id !== productId));
    };

    const clearCompare = () => {
        setCompareList([]);
    };

    return (
        <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare }}>
            {children}
        </CompareContext.Provider>
    );
};

export const useCompare = () => {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error("useCompare must be used within a CompareProvider");
    }
    return context;
};
