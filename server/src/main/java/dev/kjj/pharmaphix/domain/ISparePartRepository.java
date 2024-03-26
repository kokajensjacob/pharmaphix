package dev.kjj.pharmaphix.domain;

import dev.kjj.pharmaphix.model.SparePart;
import org.springframework.data.repository.ListCrudRepository;

public interface ISparePartRepository extends ListCrudRepository<SparePart, String> {
}
