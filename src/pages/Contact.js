import React, { useState, useEffect } from 'react';

const SortExample = () => {
    const [vehicles, setVehicles] = useState({ cars: [], motorcycles: [] });
    const [people, setPeople] = useState([]);
    const [filteredPeople, setFilteredPeople] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [category, setCategory] = useState(''); // För att hålla reda på vald kategori

    useEffect(() => {
        // Ladda data från JSON-filen
        fetch('/stuff.json')
            .then(response => response.json())
            .then(data => {
                setVehicles(data.vehicles);
                setPeople(data.people);
                setFilteredPeople(data.people); // Initiera med alla personer
            })
            .catch(error => console.error('Error fetching the JSON file:', error));
    }, []);

    // Alternativ för sortering
    const sortOptions = {
        cars: [
            { label: 'Sortera Bilar A-Ö', value: 'carAtoO' },
            { label: 'Sortera Bilar Ö-A', value: 'carOtoA' },
            { label: 'Sortera Bilar Motorvolym Störst till Minst', value: 'carLargestVolumeToSmallest' },
            { label: 'Sortera Bilar Motorvolym Minst till Störst', value: 'carSmallestVolumeToLargest' },
            { label: 'Sortera Bilar Däck Störst till Minst', value: 'carLargestTiresToSmallest' },
            { label: 'Sortera Bilar Däck Minst till Störst', value: 'carSmallestTiresToLargest' },
            { label: 'Sortera Bilar Platser Störst till Minst', value: 'carLargestSeatsToSmallest' },
            { label: 'Sortera Bilar Platser Minst till Störst', value: 'carSmallestSeatsToLargest' },
        ],
        motorcycles: [
            { label: 'Sortera Motorcyklar A-Ö', value: 'mcAtoO' },
            { label: 'Sortera Motorcyklar Ö-A', value: 'mcOtoA' },
            { label: 'Sortera Motorcyklar Motorvolym Minst till Störst', value: 'mcSmallestVolumeToLargest' },
            { label: 'Sortera Motorcyklar Motorvolym Störst till Minst', value: 'mcLargestVolumeToSmallest' },
            { label: 'Sortera Motorcyklar Däck Störst till Minst', value: 'mcLargestTiresToSmallest' },
            { label: 'Sortera Motorcyklar Däck Minst till Störst', value: 'mcSmallestTiresToLargest' },
            { label: 'Sortera Motorcyklar Platser Störst till Minst', value: 'mcLargestSeatsToSmallest' },
            { label: 'Sortera Motorcyklar Platser Minst till Störst', value: 'mcSmallestSeatsToLargest' },
        ],
        people: [
            { label: 'Sortera Personer Hårfärg A-Ö', value: 'peopleHairColorAtoO' },
            { label: 'Sortera Personer Hårfärg Ö-A', value: 'peopleHairColorOtoA' },
            { label: 'Sortera Personer Yngst till Äldst', value: 'peopleYoungestToOldest' },
            { label: 'Sortera Personer Äldst till Yngst', value: 'peopleOldestToYoungest' },
            { label: 'Sortera Personer Med Körkort', value: 'peopleWithLicense' },
            { label: 'Sortera Personer Utan Körkort', value: 'peopleWithoutLicense' },
        ],
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setSortOption(''); // Återställ sorteringsalternativ när kategori ändras
    };

    const handleSortChange = (event) => {
        const sortType = event.target.value;
        setSortOption(sortType);

        let sortedCars = [...vehicles.cars];
        let sortedMotorcycles = [...vehicles.motorcycles];
        let sortedPeople = [...people];
          // Normalize the hasLicense property for consistency
      sortedPeople = sortedPeople.map(person => ({
          ...person,
          hasLicense: person.hasLicense.toLowerCase() === 'ja' // Convert to boolean
      }));
        // Filter people based on license
          if (sortType === 'peopleWithoutLicense') {
              sortedPeople = sortedPeople.filter(person => !person.hasLicense);
          } else if (sortType === 'peopleWithLicense') {
              sortedPeople = sortedPeople.filter(person => person.hasLicense);
          }

        switch (sortType) {
            // Bilar
            case 'carAtoO':
                sortedCars.sort((a, b) => a.model.localeCompare(b.model, 'sv'));
                break;
            case 'carOtoA':
                sortedCars.sort((a, b) => b.model.localeCompare(a.model, 'sv'));
                break;
            case 'carLargestVolumeToSmallest':
                sortedCars.sort((a, b) => parseVolume(b.motor) - parseVolume(a.motor));
                break;
            case 'carSmallestVolumeToLargest':
                sortedCars.sort((a, b) => parseVolume(a.motor) - parseVolume(b.motor));
                break;
            case 'carLargestTiresToSmallest':
                sortedCars.sort((a, b) => parseTireSize(b.tires) - parseTireSize(a.tires));
                break;
            case 'carSmallestTiresToLargest':
                sortedCars.sort((a, b) => parseTireSize(a.tires) - parseTireSize(b.tires));
                break;
            case 'carLargestSeatsToSmallest':
                sortedCars.sort((a, b) => b.seats - a.seats);
                break;
            case 'carSmallestSeatsToLargest':
                sortedCars.sort((a, b) => a.seats - b.seats);
                break;
            // Motorcyklar
            case 'mcAtoO':
                sortedMotorcycles.sort((a, b) => a.model.localeCompare(b.model, 'sv'));
                break;
            case 'mcOtoA':
                sortedMotorcycles.sort((a, b) => b.model.localeCompare(a.model, 'sv'));
                break;
            case 'mcLargestVolumeToSmallest':
                sortedMotorcycles.sort((a, b) => parseVolume(b.motor) - parseVolume(a.motor));
                break;
            case 'mcSmallestVolumeToLargest':
                sortedMotorcycles.sort((a, b) => parseVolume(a.motor) - parseVolume(b.motor));
                break;
            case 'mcLargestTiresToSmallest':
                sortedMotorcycles.sort((a, b) => parseTireSize(b.tires) - parseTireSize(a.tires));
                break;
            case 'mcSmallestTiresToLargest':
                sortedMotorcycles.sort((a, b) => parseTireSize(a.tires) - parseTireSize(b.tires));
                break;
            case 'mcLargestSeatsToSmallest':
                sortedMotorcycles.sort((a, b) => b.seats - a.seats);
                break;
            case 'mcSmallestSeatsToLargest':
                sortedMotorcycles.sort((a, b) => a.seats - b.seats);
                break;
            // Personer
            case 'peopleHairColorAtoO':
                sortedPeople.sort((a, b) => a.hairColor.localeCompare(b.hairColor, 'sv'));
                break;
            case 'peopleHairColorOtoA':
                sortedPeople.sort((a, b) => b.hairColor.localeCompare(a.hairColor, 'sv'));
                break;
            case 'peopleYoungestToOldest':
                sortedPeople.sort((a, b) => a.age - b.age);
                break;
            case 'peopleOldestToYoungest':
                sortedPeople.sort((a, b) => b.age - a.age);
                break;
            default:
                break;
        }

        // Sätt de sorterade listorna
        setVehicles({ cars: sortedCars, motorcycles: sortedMotorcycles });
        setFilteredPeople(sortedPeople); // Sätt den sorterade listan för personer
    };

    // Funktion för att parsa motorvolym och jämföra som nummer
    const parseVolume = (volume) => {
        if (volume.toLowerCase() === 'el') return 0; // Behandla el som 0 för att vara den minsta
        return parseFloat(volume.replace(',', '.').replace('L', ''));
    };

    // Funktion för att parsa däckstorlek och jämföra som nummer
    const parseTireSize = (size) => {
        return parseInt(size.replace(' inch', '')); // Konvertera till heltal
    };

    return (
        <div>
            <h2>Sortering av fordon och personer</h2>

            {/* Kategori dropdown */}
            <select onChange={handleCategoryChange} value={category}>
                <option value="">Välj kategori</option>
                <option value="cars">Bilar</option>
                <option value="motorcycles">Motorcyklar</option>
                <option value="people">Personer</option>
            </select>

            {/* Sorteringsdropdown som visas baserat på vald kategori */}
            {category && (
                <select onChange={handleSortChange} value={sortOption}>
                    <option value="">Välj sorteringsalternativ</option>
                    {(category === 'cars' ? sortOptions.cars :
                      category === 'motorcycles' ? sortOptions.motorcycles :
                      sortOptions.people).map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            )}

            {/* Visning av sorterade fordon/personer */}
            {category === 'cars' && (
                <div>
                    <h3>Bilar:</h3>
                    <ul>
                        {vehicles.cars.map((car, index) => (
                            <li key={index}>{car.model}, Motor: {car.motor}, Däck: {car.tires}, Platser: {car.seats}</li>
                        ))}
                    </ul>
                </div>
            )}

            {category === 'motorcycles' && (
                <div>
                    <h3>Motorcyklar:</h3>
                    <ul>
                        {vehicles.motorcycles.map((mc, index) => (
                            <li key={index}>{mc.model}, Motor: {mc.motor}, Däck: {mc.tires}, Platser: {mc.seats}</li>
                        ))}
                    </ul>
                </div>
            )}

            {category === 'people' && (
                <div>
                    <h3>Personer:</h3>
                    <ul>
                        {filteredPeople.map((person, index) => (
                            <li key={index}>{person.name}, Hårfärg: {person.hairColor}, Ålder: {person.age}, Körkort: {person.hasLicense ? 'Ja' : 'Nej'}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SortExample;
