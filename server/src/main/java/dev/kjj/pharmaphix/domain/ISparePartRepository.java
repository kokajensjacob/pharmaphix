package dev.kjj.pharmaphix.domain;

import dev.kjj.pharmaphix.model.SparePart;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface ISparePartRepository extends ListCrudRepository<SparePart, String> {

    List<SparePart> findSparePartsByQuantityInRepairGreaterThan(int i);
}
