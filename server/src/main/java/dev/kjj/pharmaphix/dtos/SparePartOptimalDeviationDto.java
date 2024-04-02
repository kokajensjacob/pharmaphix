package dev.kjj.pharmaphix.dtos;

public record SparePartOptimalDeviationDto(deviation overstocked, deviation understocked) {
    private record deviation(long spareParts, long sparePartUnits){};
    public static SparePartOptimalDeviationDto createDto(long sparePartsOverstocked, long sparePartUnitsOverstocked,
                                               long sparePartsUnderstocked, long sparePartUnitsUnderstocked) {
        return new SparePartOptimalDeviationDto(
                new deviation(sparePartsOverstocked, sparePartUnitsOverstocked),
                new deviation(sparePartsUnderstocked, sparePartUnitsUnderstocked)
        );
    }
}
