public with sharing class Animal {
    public Animal() {

    }
    public String species;
    public String colour;

    public Animal(String species, String colour){
       
      this.species = species;
      this.colour = colour;

    }
    public void eat(){
        System.debug('Animal eats');
    }

    public void drink(){
        System.debug('Animal sleeps');
       
    }
    // List<Fish> fishes;
    // List<Predator> predators;
    // List<Mammal> mammals;
}