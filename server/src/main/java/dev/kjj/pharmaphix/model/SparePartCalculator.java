package dev.kjj.pharmaphix.model;
import java.util.*;
public class SparePartCalculator {
    public static double optimalStockValue(double lambdaT, double spareCost, double machineCost){
        List<Double> probability = new ArrayList<>();
        List<Double> probForShortage = new ArrayList<>();
        List<Double> expectedBackOrder = new ArrayList<>();
        List<Double> varianceBackOrder = new ArrayList<>();

        probability.add(Math.exp(-lambdaT));
        probability.add(Math.exp(-lambdaT));

        probForShortage.add(1 - probability.get(0));
        probForShortage.add(1 - probability.get(0));

        expectedBackOrder.add(lambdaT);
        expectedBackOrder.add(lambdaT);

        varianceBackOrder.add(lambdaT);
        varianceBackOrder.add(lambdaT);

        int s = 1;
        boolean run = true;
        while (run) {
            s++;
            probability.add(lambdaT * probability.get(s - 1) /(s-1));
            probForShortage.add(probForShortage.get(s - 1) - probability.get(s));
            expectedBackOrder.add(expectedBackOrder.get(s-1) - probForShortage.get(s-1));
            varianceBackOrder.add(varianceBackOrder.get(s-1) -
                    (expectedBackOrder.get(s-1) + expectedBackOrder.get(s))
                            *(1 - probForShortage.get(s-1)));

            if (probForShortage.get(s) <= spareCost / machineCost) {
                run = false;
            }

        }
        System.out.println("s: " + s);
        System.out.println("Expected back order: " + expectedBackOrder.get(s));
        System.out.println("Variance back order: " + varianceBackOrder.get(s));

            return s;
        }
    }
}
