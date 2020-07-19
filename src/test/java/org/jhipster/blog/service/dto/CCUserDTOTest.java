package org.jhipster.blog.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.jhipster.blog.web.rest.TestUtil;

public class CCUserDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CCUserDTO.class);
        CCUserDTO cCUserDTO1 = new CCUserDTO();
        cCUserDTO1.setId(1L);
        CCUserDTO cCUserDTO2 = new CCUserDTO();
        assertThat(cCUserDTO1).isNotEqualTo(cCUserDTO2);
        cCUserDTO2.setId(cCUserDTO1.getId());
        assertThat(cCUserDTO1).isEqualTo(cCUserDTO2);
        cCUserDTO2.setId(2L);
        assertThat(cCUserDTO1).isNotEqualTo(cCUserDTO2);
        cCUserDTO1.setId(null);
        assertThat(cCUserDTO1).isNotEqualTo(cCUserDTO2);
    }
}
