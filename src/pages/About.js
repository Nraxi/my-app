import React, { useState } from 'react';

const SortExample = () => {
    const [items, setItems] = useState([
        { name: 'äpple', number: 5 },
        { name: 'banan', number: 2 },
        { name: 'citron', number: 9 },
        { name: 'öga', number: 1 },
        { name: 'apelsin', number: 7 },
        { name: 'ananas', number: 6 },
    ]);

    const sortOptions = [
        { label: 'Sortera A-Ö', value: 'aToO' },
        { label: 'Sortera Ö-A', value: 'oToA' },
        { label: 'Sortera Störst till Minst', value: 'largestToSmallest' },
        { label: 'Sortera Minst till Störst', value: 'smallestToLargest' },
        { label: 'Sortera: Ö först och störst nummer först', value: 'öFirstLargestNumber' },
        { label: 'Sortera: Ö sist och störst nummer först', value: 'öLastLargestNumber' },
        { label: 'Sortera: Ö sist och minst nummer först', value: 'öLastSmallestNumber' },
        { label: 'Sortera: Ö först och minst nummer först', value: 'öFirstSmallestNumber' },
        { label: 'Sortera: A först och minst nummer först', value: 'aFirstSmallestNumber' },
        { label: 'Sortera: A först och störst nummer först', value: 'aFirstLargestNumber' },
        { label: 'Sortera: A sist och störst nummer först', value: 'aLastLargestNumber' },
        { label: 'Sortera: A sist och minst nummer först', value: 'aLastSmallestNumber' },
    ];

    const handleSortChange = (event) => {
        const sortType = event.target.value;
        let sortedItems = [...items]; // Kopiera array för att undvika mutation

        const getFirstLetter = (name) => name.charAt(0); // Funktion för att få första bokstaven

        switch (sortType) {
            case 'aToO':
                sortedItems.sort((a, b) => a.name.localeCompare(b.name, 'sv'));
                break;
            case 'oToA':
                sortedItems.sort((a, b) => b.name.localeCompare(a.name, 'sv'));
                break;
            case 'largestToSmallest':
                sortedItems.sort((a, b) => b.number - a.number);
                break;
            case 'smallestToLargest':
                sortedItems.sort((a, b) => a.number - b.number);
                break;
            case 'öFirstLargestNumber':
                sortedItems.sort((a, b) => {
                    if (getFirstLetter(a.name) === 'ö') return -1;
                    if (getFirstLetter(b.name) === 'ö') return 1;
                    return b.number - a.number;
                });
                break;
            case 'öLastLargestNumber':
                sortedItems.sort((a, b) => {
                    if (getFirstLetter(a.name) === 'ö') return 1;
                    if (getFirstLetter(b.name) === 'ö') return -1;
                    return b.number - a.number;
                });
                break;
            case 'öLastSmallestNumber':
                sortedItems.sort((a, b) => {
                    if (getFirstLetter(a.name) === 'ö') return 1;
                    if (getFirstLetter(b.name) === 'ö') return -1;
                    return a.number - b.number;
                });
                break;
            case 'öFirstSmallestNumber':
                sortedItems.sort((a, b) => {
                    if (getFirstLetter(a.name) === 'ö') return -1;
                    if (getFirstLetter(b.name) === 'ö') return 1;
                    return a.number - b.number;
                });
                break;
            case 'aFirstSmallestNumber':
                sortedItems.sort((a, b) => {
                    if (getFirstLetter(a.name) === 'a') return -1;
                    if (getFirstLetter(b.name) === 'a') return 1;
                    return a.number - b.number;
                });
                break;
            case 'aFirstLargestNumber':
                sortedItems.sort((a, b) => {
                    if (getFirstLetter(a.name) === 'a') return -1;
                    if (getFirstLetter(b.name) === 'a') return 1;
                    return b.number - a.number;
                });
                break;
            case 'aLastLargestNumber':
                sortedItems.sort((a, b) => {
                    if (getFirstLetter(a.name) === 'a') return 1;
                    if (getFirstLetter(b.name) === 'a') return -1;
                    return b.number - a.number;
                });
                break;
            case 'aLastSmallestNumber':
                sortedItems.sort((a, b) => {
                    if (getFirstLetter(a.name) === 'a') return 1;
                    if (getFirstLetter(b.name) === 'a') return -1;
                    return a.number - b.number;
                });
                break;
            default:
                break;
        }

        setItems(sortedItems); // Sätt den sorterade listan
    };

    return (
        <div>
            <h2>Sortering av frukter och nummer</h2>
            <select onChange={handleSortChange}>
                <option value="">Välj sorteringsalternativ</option>
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.name} (Nummer: {item.number})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SortExample;
