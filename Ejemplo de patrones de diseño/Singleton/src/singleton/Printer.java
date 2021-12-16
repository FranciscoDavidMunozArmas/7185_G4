/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package singleton;

/**
 *
 * @author panch
 */
public class Printer {
    
    private static Printer instance;
    
    private Printer() {}
       
    public static Printer getInstance() {
        if (instance == null) {
            instance = new Printer();
        }
        return instance;
    }
    
    public void print() {
        System.out.println("The document's preparing");
        System.out.println("The document's ready");
        System.out.println("The document's been printed");
    }
}


