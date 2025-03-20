#include <stdio.h>

struct Student
{
    char name[50];
    int rollNumber;
    float marks;
};

int main()
{
    struct Student s;
    scanf(" %[^\n]", s.name);
    scanf("%d", &s.rollNumber);

    scanf("%f", &s.marks);
    printf("%s\n", s.name);
    printf("%d\n", s.rollNumber);
    printf("%.2f\n", s.marks);

    return 0;
}
