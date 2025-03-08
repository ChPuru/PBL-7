exports.updatePoints = (wasteType) => {
    const pointValues = {
        organic: 2,
        plastic: 5,
        metal: 7,
        glass: 6,
        ewaste: 10
    };

    return pointValues[wasteType] || 1;
};
