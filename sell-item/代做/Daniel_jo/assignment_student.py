###############################################
# Imports used                                #
# You may import other libraries if necessary #
###############################################
import sys

import helloworld


#################################################
# Constants used                                #
# You may add other constants here if necessary #
#################################################

# constant tuple named DEPARTMENT to store the department that can be selected when add
DEPARTMENT = ("HR","IT","Admin", "Finance")


# Function ID mapped with name
RETURN = ""
DISPLAY_ALL_EMPLOYEES = 1
ADD_AN_EMPLOYEE = 2
REMOVE_AN_EMPLOYEE = 3
UPDATE_EMPLOYEE_SALARY = 4
DISPLAY_STATISTICS = 5

# Other constants here



#################################################
# Functions used                                #
# You may add other functions here if necessary #
#################################################


# write a function display_all_employees for menu item 1 to display all employees in system
def display_all_employees(list_dict_employees):
    # complete your function here
    # this function have no return value

    pass

# write a function display_stat for menu item 5 to display company statistics in system
def display_stat(list_dict_employees):
    # complete your function here
    # this function have no return value
    

    pass



# write a function read_employee_from_file to read in employee’s information from file named "employee.txt" located in the same folder
def read_employee_from_file():
    list_dict_employees = list()
    # complete your function here
    # this function should return a list of dictionary contains all employee's information

    






    # This static variable is for your development in early stage
    # Zero marks will be given if you assigned the employee data by this static variable    
    """
    list_dict_employees = [
        {"ID": "IVE00001", "Name": "Kelvin Yip", "Salary" : 43210.5, "Department": "IT" },
        {"ID": "IVE00002", "Name": "Cow Leung", "Salary" : 32105.4, "Department": "Admin" },
        {"ID": "IVE00003", "Name": "Leung Pig Hung", "Salary" : 21054.3, "Department": "HR" },
        {"ID": "IVE00004", "Name": "Michael Fung", "Salary" : 10543.2, "Department": "Finance" },
        {"ID": "IVE00005", "Name": "Joe Yeung", "Salary" : 6543.2, "Department": "IT" },
        {"ID": "IVE00006", "Name": "Martin Kung", "Salary" : 5432.1, "Department": "Admin" }
    ]
    """
    return list_dict_employees
    

# You may implement other necessary functions here







# Main function starts here
def main():

    helloworld.print_helloworld()

    # Read employees record from file
    list_dict_employees = read_employee_from_file()

        
    # Welcome message
    print("Welcome to Employee Management System.")

    # Main menu
    while True:
        print("=======================================")
        print("Employee Management System Menu:")
        print("No. | Function")
        print("1   | Display all employee")
        print("2   | Add an employee")
        print("3   | Remove an employee")
        print("4   | Update employee salary")
        print("5   | Display company statistics")
        input_function = input("Please input your choice. (1 – 5, Enter to exit): ")
        

        # When user pressed enter - break
        if input_function == RETURN:
            break


        # When user input 1 to display all employee
        if input_function == DISPLAY_ALL_EMPLOYEES:
            pass

        # When user input 3 to remove employee record
        elif input_function == REMOVE_AN_EMPLOYEE:
            pass


        # When user input 4 to update an employee salary
        elif input_function == UPDATE_EMPLOYEE_SALARY:
            pass



        # When user input 5 to display company statistics
        elif input_function == DISPLAY_STATISTICS:
            pass
        


    
if __name__ == "__main__":
    main()
