package go.party.tcs.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ResponseRelatorio {
    private List<?> data;
    private PaginationDTO pagination;
}
