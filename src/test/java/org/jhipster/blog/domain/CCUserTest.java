package org.jhipster.blog.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.jhipster.blog.web.rest.TestUtil;

public class CCUserTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CCUser.class);
        CCUser cCUser1 = new CCUser();
        cCUser1.setId(1L);
        CCUser cCUser2 = new CCUser();
        cCUser2.setId(cCUser1.getId());
        assertThat(cCUser1).isEqualTo(cCUser2);
        cCUser2.setId(2L);
        assertThat(cCUser1).isNotEqualTo(cCUser2);
        cCUser1.setId(null);
        assertThat(cCUser1).isNotEqualTo(cCUser2);
    }
}
