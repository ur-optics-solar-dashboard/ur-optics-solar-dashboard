import fakedata
import os

def main():
    print('How many days (starting Jan 1st 2021)?')
    dayct = int(input())
    os.makedirs('fake')
    for i in range(dayct):
        fake = fakedata.generateFake(2021, i)
        f = open('fake/fake_{doy}.csv'.format(doy=i), 'w', newline='')
        f.write(fake)
        f.close()
    print('Done, check /fake')

if __name__ == '__main__':
    main()