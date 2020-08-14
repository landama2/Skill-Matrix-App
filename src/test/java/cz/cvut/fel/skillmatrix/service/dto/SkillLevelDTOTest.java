package cz.cvut.fel.skillmatrix.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import cz.cvut.fel.skillmatrix.web.rest.TestUtil;

public class SkillLevelDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SkillLevelDTO.class);
        SkillLevelDTO skillLevelDTO1 = new SkillLevelDTO();
        skillLevelDTO1.setId(1L);
        SkillLevelDTO skillLevelDTO2 = new SkillLevelDTO();
        assertThat(skillLevelDTO1).isNotEqualTo(skillLevelDTO2);
        skillLevelDTO2.setId(skillLevelDTO1.getId());
        assertThat(skillLevelDTO1).isEqualTo(skillLevelDTO2);
        skillLevelDTO2.setId(2L);
        assertThat(skillLevelDTO1).isNotEqualTo(skillLevelDTO2);
        skillLevelDTO1.setId(null);
        assertThat(skillLevelDTO1).isNotEqualTo(skillLevelDTO2);
    }
}
