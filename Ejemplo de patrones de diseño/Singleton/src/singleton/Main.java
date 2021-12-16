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
public class Main {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        init();
    }

    public static void init() {

        Printer computer = Printer.getInstance();
        computer.print();
        System.out.println("");
        Printer smartphone = Printer.getInstance();
        smartphone.print();

        System.out.println("");
        Computer firstItem = new Computer();
        Computer secondItem = new Computer();
        Smartphone thirdItem = new Smartphone();

        secondItem.print();
        System.out.println("");
        firstItem.print();
        System.out.println("");
        thirdItem.print();

    }

}
