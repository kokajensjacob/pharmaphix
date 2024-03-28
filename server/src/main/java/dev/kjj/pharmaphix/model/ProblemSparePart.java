package dev.kjj.pharmaphix.model;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "problems_spare_parts",
        uniqueConstraints = @UniqueConstraint(columnNames = {"problem_id", "spare_part_id"}))
@Getter
public class ProblemSparePart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "problem_id", referencedColumnName = "id")
    private Problem problem;

    @ManyToOne(optional = false)
    @JoinColumn(name = "spare_part_id", referencedColumnName = "id")
    private SparePart sparePart;

    private int spQuantityNeeded;
}
