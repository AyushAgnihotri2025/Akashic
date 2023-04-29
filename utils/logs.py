def fg(r,g,b):
  return f'\033[38;2;{r};{g};{b}m'

def bg(r,g,b):
  return f"\033[48;2;{r};{g};{b}m"

fg_red = fg(242,78,78)
fg_orange = fg(255,168,5)
fg_yellow = fg(249,255,89)
fg_lightgreen = '\033[92m'
fg_green = fg(54,200,99)
fg_lightblue = '\033[94m'
fg_blue = '\033[34m'
fg_purple = fg(151,71,255)
fg_brown = fg(190,140,100)
fg_black = fg(0,0,0)
fg_silver = fg(191,191,191)

bg_red = bg(255,0,69)
bg_orange = bg(255,100,0)
bg_yellow = bg(255,255,0)
bg_lightgreen = '\033[102m'
bg_green = bg(54,150,50)
bg_lightblue = '\033[104m'
bg_blue = '\033[44m'
bg_purple = bg(151,50,250)
bg_brown = bg(190,100,77)
bg_silver = bg(163,163,163)

bold = '\033[1m'
dim = '\033[2m'
italic = '\033[3m'
underline = '\033[4m'
reverse = '\033[7m'
invisible = '\033[8m'
crossover = '\033[9m'
reset = '\033[0m'