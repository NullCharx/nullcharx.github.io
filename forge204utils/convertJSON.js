function convertToClimateParameterList() {
    const jsonInput = document.getElementById("jsonInput").value;
    try {
        // Parse the full JSON input
        const fullData = JSON.parse(jsonInput);
        // Navigate to the biomes array within the biome_source object
        const biomesData = fullData.generator.biome_source.biomes;

        let output = []; // This will store the output strings

        biomesData.forEach(biomeEntry => {
            const biome = biomeEntry.biome;
            const params = biomeEntry.parameters;
            const temperature = formatParameterRange(params.temperature);
            const humidity = formatParameterRange(params.humidity);
            const continentalness = formatParameterRange(params.continentalness);
            const erosion = formatParameterRange(params.erosion);
            const weirdness = formatParameterRange(params.weirdness);
            const depth = formatParameterRange(params.depth);
            const offset = `${params.offset}F`;

            // Determine if the biome is a Minecraft biome or a custom mod biome
            const biomeNamespace = biome.includes("minecraft:") ? "Biomes" : "ModBiomes";
            const biomeName = biome.split(":")[1].toUpperCase();

            // Construct the output string for this biome
            const outputStr = `Pair.of(Climate.parameters(${temperature}, ${humidity}, ${continentalness}, ${erosion}, ${weirdness}, ${depth}, ${offset}), ${biomeNamespace}.${biomeName})`;
            output.push(outputStr);
        });

        // Display the output
        document.getElementById("output").textContent = `new Climate.ParameterList<>(List.of(\n ${output.join(',\n')} \n));`;
    } catch (e) {
        alert("Invalid JSON. Please check your input.\nError: " + e.message + "\n" + e.stack);
        console.error(e);
    }
}

function formatParameterRange(param) {
    if (Array.isArray(param) && param.length === 2) {
        return param[0] === param[1] ? `Climate.Parameter.point(${param[0]}F)` : `Climate.Parameter.span(${param[0]}F, ${param[1]}F)`;
    } else if (Array.isArray(param)) {
        // Handles the case where depth is a single value but wrapped in an array
        return `Climate.Parameter.point(${param[0]}F)`;
    }
    // Handles the case where depth or any parameter is directly a single value
    return `Climate.Parameter.point(${param}F)`;
}
