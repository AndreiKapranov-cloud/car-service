

public with sharing class SkillController {
    public SkillController() {
    }

    @AuraEnabled(cacheable=true)
    public static List<Skill> getSkills() {
        return [
            SELECT MasterLabel
            FROM Skill
            Limit 20
       ];
    }
}