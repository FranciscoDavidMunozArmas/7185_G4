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
public class Computer implements Device {
    
    private Printer printer;
    
    Computer() {
        this.printer = Printer.getInstance();
    }

    @Override
    public void print() {
        this.printer.print();
    }
    
}
