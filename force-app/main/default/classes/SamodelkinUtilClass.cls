public with sharing class SamodelkinUtilClass {
    public SamodelkinUtilClass() {

    }





    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> getDurationTypePicklistValues() {
        List<Schema.PicklistEntry> entries = WorkType.DurationType.getDescribe().getPicklistValues();
        List<Map<String, String>> values = new List<Map<String, String>>();
        for (Schema.PicklistEntry entry : entries) {
            Map<String, String> valueMap = new Map<String, String>();
            valueMap.put('label', entry.getLabel());
            valueMap.put('value', entry.getValue());
            values.add(valueMap);
        }
        return values;
    }



   
    // public static List<Map<String, String>> getPicklistValuesUsingApex(List<Map<String ,String>> listOfmapsOfSobjectTypeAndFieldName){
       
      
    //  // system.debug()
    //  List<Map<String, String>> values = new List<Map<String, String>>();

     

    //         for(Map<String ,String> mapOfSobjectTypeAndFieldName : listOfmapsOfSobjectTypeAndFieldName){
                
    //             for (String sObjectType : mapOfSobjectTypeAndFieldName.keySet()) {
                
    //                 String fieldName = mapOfSobjectTypeAndFieldName.get(sObjectType);
                    
                
    //                 List<Schema.PicklistEntry> entries = Schema.getGlobalDescribe().get(sObjectType).getDescribe().fields.getMap().get(fieldName).getDescribe().getPickListValues();

    //                 for (Schema.PicklistEntry entry : entries) {
    //                 Map<String, String> valueMap = new Map<String, String>();
    //                 valueMap.put('label', entry.getLabel());
    //                 valueMap.put('value', entry.getValue());
    //                 values.add(valueMap);
    //                 }
    //             }
        
    //     }
    //  return values;
    // }








    // public static List<Map<String, String>> getPicklistValuesUsingApex( map<String,List<String> > mapofSObjectAndFields){

   
    // // mapofFields.put('Account', new List<String>{'Name'});
    // // mapofFields.put('Contact', new List<String>{'Name'});


    // for(String sObjectName : mapofSObjectAndFields){

    // List<String>fieldNames = mapofSObjectAndFields.get(sObjectName);







    
    //     List<String> picklistValues = new List<String>();
    //     try{
        
    //     List<Schema.PicklistEntry> entries = Schema.getGlobalDescribe().get(sObjectType).getDescribe().fields.getMap().get(field).getDescribe().getPickListValues();
         
    //     for (Schema.PicklistEntry entry : entries) {
    //         picklistValues.add(entry.getValue());
    //      }
    //     } catch(Exception e) {
        
    //         System.debug('The following exception has occurred: ' + e.getMessage()); 
        
    //         throw new AuraHandledException('The following exception has occurred: ' + e.getMessage()); 
    //     }
    //     return picklistValues;
    //   }
@AuraEnabled()
public static List<Map<String,List<String>>> getMenList(){

List <String> riverFishes = new List<String>{'karas','gudgeon'};
List <String> seaFishes = new List<String>{'vale','sward-fish'};


List <String> catPredators = new List<String>{'tiger','lion'};
List <String> dogPredators= new List<String>{'volf','bear'};


List <String> australianMammals = new List<String>{'duckbill','koala'};
List <String> arcticMammals = new List<String>{'polarBear','walrus'};



Map<String,List<String>> fishes = new Map<String,List<String>>();
fishes.put('riverFishes',riverFishes);
fishes.put('seaFishes',seaFishes);




Map<String,List<String>> predators = new Map<String,List<String>>();
fishes.put('catPredators',catPredators);
fishes.put('seaFishes',dogPredators);



Map<String,List<String>> mammals = new Map<String,List<String>>();
fishes.put('australianMammals',australianMammals);
fishes.put('arcticMammals',arcticMammals);

List<Map<String,List<String>>> animalsList = new List<Map<String,List<String>>>();
animalsList.add(fishes);
animalsList.add(predators);
animalsList.add(mammals);









List <String> belarusians = new List<String>{'Vasil Bykau','Uladzimir Karatkevich'};
List <String> ukrainians = new List<String>{'Nikolay Gogol','Taras Shevchenko'};


List <String> livians = new List<String>{'Muhak Muhak','Eblak MacCryak'};
List <String> egyptyans = new List<String>{'Balu balu','Japar'};


List <String> indians = new List<String>{'man1','man2'};
List <String> chineese = new List<String>{'man3','man4'};



Map<String,List<String>> white = new Map<String,List<String>>();
fishes.put('belarusians',belarusians);
fishes.put('ukrainians',ukrainians);




Map<String,List<String>> black = new Map<String,List<String>>();
fishes.put('livians',livians);
fishes.put('egyptyans',egyptyans);



Map<String,List<String>> yellow = new Map<String,List<String>>();
fishes.put('indians',indians);
fishes.put('chineese',chineese);


List<Map<String,List<String>>> menList = new List<Map<String,List<String>>>();
menList.add(white);
menList.add(black);
menList.add(yellow);

return menList;


    }
    
   }

