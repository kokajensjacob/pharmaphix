package dev.kjj.pharmaphix.domain;

import dev.kjj.pharmaphix.model.Machine;
import org.springframework.data.repository.ListCrudRepository;

public interface IMachineRepository extends ListCrudRepository<Machine, String> {
}
