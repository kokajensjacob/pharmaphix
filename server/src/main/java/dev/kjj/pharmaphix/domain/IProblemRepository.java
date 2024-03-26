package dev.kjj.pharmaphix.domain;

import dev.kjj.pharmaphix.model.Problem;
import org.springframework.data.repository.ListCrudRepository;

public interface IProblemRepository extends ListCrudRepository<Problem, String> {
}
