package cz.cvut.fel.skillmatrix.domain;

import cz.cvut.fel.skillmatrix.web.rest.TestUtil;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class SkillLevelTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SkillLevel.class);
        SkillLevel skillLevel1 = new SkillLevel();
        skillLevel1.setId(1L);
        SkillLevel skillLevel2 = new SkillLevel();
        skillLevel2.setId(skillLevel1.getId());
        assertThat(skillLevel1).isEqualTo(skillLevel2);
        skillLevel2.setId(2L);
        assertThat(skillLevel1).isNotEqualTo(skillLevel2);
        skillLevel1.setId(null);
        assertThat(skillLevel1).isNotEqualTo(skillLevel2);
    }
}
