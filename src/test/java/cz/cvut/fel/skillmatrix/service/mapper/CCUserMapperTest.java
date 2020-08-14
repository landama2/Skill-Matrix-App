package cz.cvut.fel.skillmatrix.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class CCUserMapperTest {

    private CCUserMapper cCUserMapper;

    @BeforeEach
    public void setUp() {
        cCUserMapper = new CCUserMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(cCUserMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(cCUserMapper.fromId(null)).isNull();
    }
}
