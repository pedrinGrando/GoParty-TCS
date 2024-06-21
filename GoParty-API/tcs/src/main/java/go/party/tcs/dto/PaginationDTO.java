package go.party.tcs.dto;


import org.springframework.data.domain.Page;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PaginationDTO {
    
    private Integer page;
    private Integer size;
    private Long totalElements;
    private Integer totalPages;

    public static PaginationDTO fromPage(Page<?> page) {
        return new PaginationDTO(
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages()
        );
    }
}