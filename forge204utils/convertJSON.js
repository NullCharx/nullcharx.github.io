function convertToClimateParameterList() {
    const jsonInput = document.getElementById("jsonInput").value;
    try {
        const biomesData = JSON.parse(jsonInput);
        let output = []; // This will store the output strings

        biomesData.forEach(biome => {
            const params = biome.parameters;
            const temperature = formatParameterRange(params.temperature);
            const humidity = formatParameterRange(params.humidity);
            const continentalness = formatParameterRange(params.continentalness);
            const erosion = formatParameterRange(params.erosion);
            const weirdness = formatParameterRange(params.weirdness);
            const depth = formatParameterRange(params.depth);
            const offset = `${params.offset}F`;

            // Construct the output string for this biome
            const outputStr = `Pair.of(Climate.parameters(${temperature}, ${humidity}, ${continentalness}, ${erosion}, ${weirdness}, ${depth}, ${offset}), Biomes.YOUR_BIOME_NAME)`;
            output.push(outputStr);
        });

        // Display the output
        document.getElementById("output").textContent = `new Climate.ParameterList<>(List.of(\n ${output.join(',\n')} \n));`;
    } catch (e) {
        alert("Invalid JSON. Please check your input.");
        console.error(e);
    }
}

function formatParameterRange(param) {
    if (Array.isArray(param) && param.length === 2) {
        return param[0] === param[1] ? `Climate.Parameter.point(${param[0]}F)` : `Climate.Parameter.span(${param[0]}F, ${param[1]}F)`;
    }
    return `Climate.Parameter.point(${param}F)`;
}
